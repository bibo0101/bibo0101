import { render, screen } from '@testing-library/react';
import DataInputListener from './InputDataListener';
import MultiSelectListener from './MultiSelectListener';
import ThresholdListener from './ThresholdListener';
import BooleanListener from './BooleanListener';
import SelectListener from './SelectListener';
import * as RHF from 'react-hook-form'; // Import react-hook-form for mocking

// Mock useWatch from react-hook-form
jest.spyOn(RHF, 'useWatch').mockImplementation(() => 'mockedValue');

jest.mock('./MultiSelectListener', () => jest.fn(() => <div>MultiSelectListener</div>));
jest.mock('./ThresholdListener', () => jest.fn(() => <div>ThresholdListener</div>));
jest.mock('./BooleanListener', () => jest.fn(() => <div>BooleanListener</div>));
jest.mock('./SelectListener', () => jest.fn(() => <div>SelectListener</div>));

describe('DataInputListener Component', () => {
  it('renders MultiSelectListener for "multiselect" inputType', () => {
    render(<DataInputListener fieldName="field1" inputType="multiselect" section="section1" picklistType="type1" />);
    
    expect(screen.getByText('MultiSelectListener')).toBeInTheDocument();
  });

  it('renders ThresholdListener for "multiselectThreshold" inputType', () => {
    render(<DataInputListener fieldName="field2" inputType="multiselectThreshold" section="section2" picklistType="type2" />);
    
    expect(screen.getByText('ThresholdListener')).toBeInTheDocument();
  });

  it('renders BooleanListener for "booleanRadioPanel" inputType', () => {
    render(<DataInputListener fieldName="field3" inputType="booleanRadioPanel" section="section3" />);
    
    expect(screen.getByText('BooleanListener')).toBeInTheDocument();
  });

  it('renders SelectListener for "select" inputType', () => {
    render(<DataInputListener fieldName="field4" inputType="select" section="section4" picklistType="type4" />);
    
    expect(screen.getByText('SelectListener')).toBeInTheDocument();
  });

  it('renders empty fragment for an unrecognized inputType', () => {
    render(<DataInputListener fieldName="field5" inputType="unknownType" section="section5" />);
    
    expect(screen.queryByText('MultiSelectListener')).not.toBeInTheDocument();
    expect(screen.queryByText('ThresholdListener')).not.toBeInTheDocument();
    expect(screen.queryByText('BooleanListener')).not.toBeInTheDocument();
    expect(screen.queryByText('SelectListener')).not.toBeInTheDocument();
  });
});

================================================================
    
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import AttestationPanel from './AttestationPanel';
import { updateFcrmAttestation } from '../../../redux/slices/fcrmAttestationSlice';
import { getUserInfo } from '../../helpers/userDetails';
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('../../../redux/slices/fcrmAttestationSlice', () => ({
    updateFcrmAttestation: jest.fn(),
}));

jest.mock('../../helpers/userDetails', () => ({
    getUserInfo: jest.fn(),
}));
import React from 'react';
import { render, screen } from '@testing-library/react';
import AttestationPanel from './AttestationPanel'; // Adjust the import path as necessary

// Mock the useSelector hook
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

import { useSelector } from 'react-redux';

describe('AttestationPanel Component', () => {
    beforeEach(() => {
        // Reset the mock before each test
        useSelector.mockClear();
    });

    it('renders correctly in read-only mode', () => {
        // Mock the return value of useSelector
        useSelector.mockReturnValue(75); // Example risk score

        render(<AttestationPanel readOnly={true} />);

        // Check for elements in read-only mode
        expect(screen.getByText(/read-only mode/i)).toBeInTheDocument();
        expect(screen.getByText(/risk score: 75/i)).toBeInTheDocument();
    });

    it('renders correctly in edit mode', () => {
        // Mock the return value of useSelector
        useSelector.mockReturnValue(85); // Example risk score

        render(<AttestationPanel readOnly={false} />);

        // Check for elements in edit mode
        expect(screen.getByText(/edit mode/i)).toBeInTheDocument();
        expect(screen.getByText(/risk score: 85/i)).toBeInTheDocument();
    });

    it('handles null risk score gracefully', () => {
        // Mock the return value of useSelector to be null
        useSelector.mockReturnValue(null);

        render(<AttestationPanel readOnly={true} />);

        // Check for elements when risk score is null
        expect(screen.getByText(/risk score: 0/i)).toBeInTheDocument(); // Adjust based on your component's behavior
    });
});
