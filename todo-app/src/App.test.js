import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import App from './App';

describe('renders App component', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  it("render without crashing", () => {
    shallow(<App />);
  }) 

  // check header is render
  it("render Header Component", () => {
    const { getByText } = render(<App />);
    expect(getByText("Todo App")).toBeInTheDocument(); 
  })
});
