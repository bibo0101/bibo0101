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

