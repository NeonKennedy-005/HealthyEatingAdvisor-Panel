import { render, screen, fireEvent, act } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import {
  Reviewer2Widget,
  DevilsAdvocateWidget,
  ScopeRealismWidget,
  ReviewerModal,
  DevilsModal,
  ScopeModal,
  critiqueDraft,
  countersForClaim,
  verdictForTarget,
  hasUserText,
} from './CanvasCriticWidgets';
import { EMPTY_STATE } from './canvasData';

const noop = () => {};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

test('generators refuse empty input', () => {
  expect(hasUserText('')).toBe(false);
  expect(critiqueDraft('')).toBeNull();
  expect(countersForClaim('   ')).toEqual([]);
  expect(verdictForTarget('')).toBeNull();
});

test('generators return a critique only after real text', () => {
  expect(critiqueDraft('I will cook 5 produce dinners this week.')).toMatchObject({
    severity: expect.any(Number),
    major: expect.any(String),
  });
  expect(countersForClaim('Salad kits count as cooking.')).toHaveLength(3);
  const verdict = verdictForTarget('5 produce-forward dinners/week through April 15');
  expect(verdict.score).toBeGreaterThan(0);
  expect(verdict.target).toMatch(/produce-forward/);
});

test('Reviewer 2 empty state has a paste box and no canned critique', () => {
  render(
    <Reviewer2Widget state={EMPTY_STATE['reviewer-2']} setState={noop} openModal={noop} />
  );
  const field = screen.getByLabelText(/paste a draft/i);
  expect(field.tagName).toBe('TEXTAREA');
  expect(field).not.toHaveAttribute('readonly');
  expect(field).not.toBeDisabled();
  expect(screen.queryByText(/Major:/)).toBeNull();
  expect(screen.getByText(/No critique yet/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /critique my draft/i })).toBeDisabled();
});

test('Reviewer 2 critiques only after a draft is submitted', () => {
  const setState = jest.fn();
  render(
    <Reviewer2Widget state={EMPTY_STATE['reviewer-2']} setState={setState} openModal={noop} />
  );
  fireEvent.change(screen.getByLabelText(/paste a draft/i), {
    target: { value: 'Eat healthier with more vegetables sometime.' },
  });
  fireEvent.click(screen.getByRole('button', { name: /critique my draft/i }));
  expect(setState).not.toHaveBeenCalled();
  act(() => { jest.advanceTimersByTime(700); });
  expect(setState).toHaveBeenCalled();
  expect(setState.mock.calls[0][0].lastReview.major).toBeTruthy();
});

test("Devil's Advocate empty state has a claim box and no counters", () => {
  render(
    <DevilsAdvocateWidget state={EMPTY_STATE['devils-advocate']} setState={noop} openModal={noop} />
  );
  const field = screen.getByLabelText(/enter a claim/i);
  expect(field.tagName).toBe('TEXTAREA');
  expect(field).not.toBeDisabled();
  expect(screen.queryByText(/Strongest counters/i)).toBeNull();
  expect(screen.queryByText(/Reverse causation/i)).toBeNull();
  expect(screen.getByRole('button', { name: /challenge this claim/i })).toBeDisabled();
});

test('Scope Realism empty state has a target box and no score', () => {
  render(
    <ScopeRealismWidget state={EMPTY_STATE['scope-realism']} setState={noop} openModal={noop} />
  );
  const field = screen.getByLabelText(/set a target/i);
  expect(field.tagName).toBe('TEXTAREA');
  expect(field).not.toBeDisabled();
  expect(screen.queryByText('0.0')).toBeNull();
  expect(document.querySelector('.verdict-score')).toBeNull();
  expect(document.querySelector('.realism-verdict')).toBeNull();
  expect(screen.getByRole('button', { name: /check feasibility/i })).toBeDisabled();
});

test('leftover counters stay hidden until a claim exists', () => {
  render(
    <DevilsAdvocateWidget
      state={{ claim: '', counters: [{ lbl: 'Ghost', text: 'Canned.' }] }}
      setState={noop}
      openModal={noop}
    />
  );
  expect(screen.queryByText('Ghost')).toBeNull();
  expect(screen.queryByText('Canned.')).toBeNull();
});

test('critic modals require input before generating', () => {
  render(<ReviewerModal data={{ initial: '', onComplete: noop }} onClose={noop} />);
  expect(screen.getByLabelText(/paste a draft/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /critique my draft/i })).toBeDisabled();

  render(<DevilsModal data={{ claim: '', counters: [], onUpdate: noop }} onClose={noop} />);
  expect(screen.getByLabelText(/enter a claim/i)).toBeInTheDocument();
  expect(screen.queryByText(/Reverse causation/i)).toBeNull();

  render(<ScopeModal data={{ state: EMPTY_STATE['scope-realism'], onUpdate: noop }} onClose={noop} />);
  expect(screen.getByLabelText(/set a target/i)).toBeInTheDocument();
  expect(screen.queryByText(/Recommended actions/i)).toBeNull();
  expect(screen.queryByText(/Trying to bulk and cut/i)).toBeNull();
});

test('critic input CSS keeps fields clickable', () => {
  const cssPath = path.join(__dirname, '../../styles/CanvasPage.css');
  const css = fs.readFileSync(cssPath, 'utf8');
  expect(css).toMatch(/\.critic-form[\s\S]*pointer-events:\s*auto/);
  expect(css).toMatch(/textarea\.critic-input[\s\S]*pointer-events:\s*auto/);
  expect(css).toMatch(/\.canvas-modal-backdrop[\s\S]*z-index:\s*400/);
});
