import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import MyComponent from "./MyComponent"; // Adjust based on your component's path

describe("MyComponent useEffect hooks", () => {
  it("should set boolean risk type on mount", () => {
    const mockRiskProvider = {
      getBooleanQuestion: vi.fn().mockReturnValue(true),
    };

    render(<MyComponent riskProvider={mockRiskProvider} />);

    expect(mockRiskProvider.getBooleanQuestion).toHaveBeenCalled();
  });

  it("should set previous data when fieldD changes", () => {
    const { rerender } = render(<MyComponent fieldD={undefined} />);
    rerender(<MyComponent fieldD="newData" />);

    expect(screen.getByTestId("previous-data").textContent).toBe("newData");
  });

  it("should clear errors if showE is false or errorMessage is empty", () => {
    const mockClearErrors = vi.fn();
    render(<MyComponent showE={false} errorMessage="" clearErrors={mockClearErrors} />);

    expect(mockClearErrors).toHaveBeenCalled();
  });

  it("should set an error message when rhfFieldD is undefined", () => {
    render(<MyComponent rhfFieldD={undefined} />);

    expect(screen.getByTestId("error-message").textContent).toContain("Error: required");
  });

  it("should update boolean risk and reset error message when rhfFieldD is defined", () => {
    const mockUpdateBooleanRisk = vi.fn();
    render(<MyComponent rhfFieldD="someValue" updateBooleanRisk={mockUpdateBooleanRisk} />);

    expect(mockUpdateBooleanRisk).toHaveBeenCalled();
    expect(screen.getByTestId("error-message").textContent).toBe("");
  });

  it("should update visibility when formD changes", () => {
    const { rerender } = render(<MyComponent formD={{ fieldN: { isVisible: false } }} />);
    rerender(<MyComponent formD={{ fieldN: { isVisible: true } }} />);

    expect(screen.getByTestId("visibility-status").textContent).toBe("true");
  });
});

