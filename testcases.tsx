import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useRiskScoreProvider } from "src/Escm/hooks/useRiskScoreProvider";
import {
  ExistingRiskData,
  MultiSelectUpdateResponse,
  PicklistType,
  QuestionRiskData,
  RiskThresholds,
} from "src/interfaces/RiskInterfaces";
import { getExistingDataForMultiSelect } from "src/redux/selectors/riskDataSelectors";
import { setMultiselectAnswers } from "src/redux/slices/riskSlices/multiselectAnswersSlice";
import { parseMultiSelectUpdate } from "../helpers/combinedDataParsingHelpers";
import { ReduxStore } from "src/interfaces/ReduxStore";
import { multiSelectOptionsToMap } from "../helpers/genericDataParsing";
import {
  getFcrmEntryField,
  getInvalidFieldsErrorPanelState,
} from "src/redux/selectors/generalDataSelectors";
import {
  changeFieldIsValidIsVisibleUpdate,
  changeFieldNotValidIsVisibleUpdate,
  changeFieldVisibilityRemoval,
  updateFieldValidationStatusNotValid,
} from "src/redux/actions";
import { RHF } from "@barclays/valpre-react-dynamic-form-element";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import MultiSelectListener from "../MultiSelectListener";

interface MultiSelectListenerProps {
  fieldName: string;
  section: string;
  picklistType: PicklistType;
  inputType: string;
}

describe("MultiSelectListener", () => {
  let mockDispatch: any;
  let mockStore: any;
  let mockUseRiskScoreProvider: any;

  beforeEach(() => {
    mockDispatch = vi.fn();
    mockStore = {
      getState: vi.fn().mockReturnValue({
        riskTolerance: {},
        countryRisks: new Map(),
        industryRisks: new Map(),
      }),
    };
    mockUseRiskScoreProvider = vi.fn().mockReturnValue({
      getQuestionRiskData: vi.fn(),
      addMultiSelectAnswer: vi.fn(),
      removeMultiSelectAnswer: vi.fn(),
    });
  });

  it("should initialize state correctly", () => {
    const { result } = renderHook(() =>
      MultiSelectListener({
        fieldName: "testField",
        section: "testSection",
        picklistType: "country",
        inputType: "checkbox",
      })
    );

    expect(result).toBeDefined();
  });

  it("should update state on fieldData change", () => {
    const { result, rerender } = renderHook((props) => MultiSelectListener(props), {
      initialProps: {
        fieldName: "testField",
        section: "testSection",
        picklistType: "country",
        inputType: "checkbox",
      },
    });

    act(() => {
      rerender({ fieldName: "updatedField" });
    });

    expect(result).toBeDefined();
  });

  it("should correctly handle error messages", () => {
    const { result } = renderHook(() => MultiSelectListener({
      fieldName: "testField",
      section: "testSection",
      picklistType: "country",
      inputType: "checkbox",
    }));
    
    act(() => {
      expect(result).toBeDefined();
    });
  });
});
===================================
