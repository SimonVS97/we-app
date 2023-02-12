import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import { useRouter } from 'next/router';
import userEvent from '@testing-library/user-event';
const user = userEvent.setup();

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

test('SearchBar renders a Textfield', () => {
  useRouter.mockReturnValue({ query: {} });
  render(<SearchBar />);
  const txtField = screen.getByTestId('txtField')
  expect(txtField).toBeInTheDocument();
});

test('SearchBar renders matching cities', async () => {
  useRouter.mockReturnValue({ query: {} });
  render(<SearchBar />);
  const txtField = screen.getByPlaceholderText('Please type in your city');
  await user.click(txtField);
  await user.type(txtField, 'L');
  expect(txtField.value).toBe('L');
  const testElem1 = screen.getByRole('link', { name: 'Luuq, (SO)' });
  expect(testElem1.textContent).toMatch('Luuq, (SO)');
  const testElem2 = screen.getByRole('link', { name: 'Lughaye, (SO)' });
  expect(testElem2.textContent).toMatch('Lughaye, (SO)');
  const testElem3 = screen.getByRole('link', { name: 'Las Khorey, (SO)' });
  expect(testElem3.textContent).toMatch('Las Khorey, (SO)');
  const testElem4 = screen.getByRole('link', { name: 'Lawdar, (YE)' });
  expect(testElem4.textContent).toMatch('Lawdar, (YE)');
  const testElem5 = screen.getByRole('link', { name: 'Lahij, (YE)' });
  expect(testElem5.textContent).toMatch('Lahij, (YE)')
});


