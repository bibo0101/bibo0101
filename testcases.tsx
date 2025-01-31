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
