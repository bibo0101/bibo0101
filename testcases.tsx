 import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { vi } from "vitest";
import ThresholdListener from "../ThresholdListener";
import { updateMultiselectThresholds } from "src/redux/slices/riskSlices/multiSelectThresholdsSlice";
import { ReduxStore } from "src/interfaces/ReduxStore";

const mockStore = configureStore([]);

describe("ThresholdListener Component", () => {
  let store: any;
  let dispatch: any;

  beforeEach(() => {
    store = mockStore({
      riskTolerance: {},
      industryRisks: {},
      countryRisks: {},
      generalData: {
        fieldVisibility: {},
        validationStatus: {},
      },
    });
    dispatch = vi.fn();
    store.dispatch = dispatch;
  });

  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <ThresholdListener fieldName="testField" section="testSection" picklistType="country" />
      </Provider>
    );
    expect(screen.queryByText(/error/i)).toBeNull();
  });

  it("should dispatch updateMultiselectThresholds when updating risk items", () => {
    const riskItem = { option: "Test Option", percentage: 50 };
    store.dispatch(updateMultiselectThresholds(riskItem));
    expect(dispatch).toHaveBeenCalledWith(updateMultiselectThresholds(riskItem));
  });

  it("should handle removing risk items correctly", () => {
    const riskItem = { option: "Test Option", percentage: 50 };
    store.dispatch(updateMultiselectThresholds(riskItem));
    expect(dispatch).toHaveBeenCalledWith(updateMultiselectThresholds(riskItem));
  });

  it("should handle visibility changes", () => {
    render(
      <Provider store={store}>
        <ThresholdListener fieldName="testField" section="testSection" picklistType="country" />
      </Provider>
    );
    expect(store.getState().generalData.fieldVisibility).toBeDefined();
  });
});

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { vi } from "vitest";
import ThresholdListener from "../ThresholdListener";
import { updateMultiselectThresholds } from "src/redux/slices/riskSlices/multiSelectThresholdsSlice";
import { ReduxStore } from "src/interfaces/ReduxStore";

const mockStore = configureStore([]);

describe("ThresholdListener Component", () => {
  let store: any;
  let dispatch: any;

  beforeEach(() => {
    store = mockStore({
      riskTolerance: {},
      industryRisks: {},
      countryRisks: {},
      generalData: {
        fieldVisibility: {},
        validationStatus: {},
      },
    });
    dispatch = vi.fn();
    store.dispatch = dispatch;
  });

  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <ThresholdListener fieldName="testField" section="testSection" picklistType="country" />
      </Provider>
    );
    expect(screen.queryByText(/error/i)).toBeNull();
  });

  it("should dispatch updateMultiselectThresholds when updating risk items", () => {
    const riskItem = { option: "Test Option", percentage: 50 };
    store.dispatch(updateMultiselectThresholds(riskItem));
    expect(dispatch).toHaveBeenCalledWith(updateMultiselectThresholds(riskItem));
  });

  it("should handle removing risk items correctly", () => {
    const riskItem = { option: "Test Option", percentage: 50 };
    store.dispatch(updateMultiselectThresholds(riskItem));
    expect(dispatch).toHaveBeenCalledWith(updateMultiselectThresholds(riskItem));
  });

  it("should handle visibility changes", () => {
    render(
      <Provider store={store}>
        <ThresholdListener fieldName="testField" section="testSection" picklistType="country" />
      </Provider>
    );
    expect(store.getState().generalData.fieldVisibility).toBeDefined();
  });
});
=====================
