const store = useStore();

useEffect(() => {
  setBooleanRiskType(riskProvider?.getBooleanQuestion(fieldN));
}, []);

useEffect(() => {
  if (fieldD === undefined) return;
  setPreviousData(fieldD);
}, [fieldD]);

useEffect(() => {
  if (!showE || errorMessage === '') {
    clearErrors(fieldN);
    return;
  } else {
    setError(fieldN, { type: "custom", message: errorMessage });
  }
}, [showE, errorMessage]);

useEffect(() => {
  if (rhfFieldD === undefined) {
    setErrorMessage('Error: required |');
    return;
  }

  const value = handleEntryU();
  updateBooleanRisk(value);
  setErrorMessage('');

  dispatch(changeFieldIsValidIsVisibleUpdate({ value, fieldN }));
}, [rhfFieldD]);

useEffect(() => {
  if (!initialised) {
    setInitialised(true);
    return;
  }

  const fieldIsV = formD?.[fieldN]?.isVisible;
  if (fieldIsV !== undefined && fieldIsV !== isVisible) {
    setIsVisible(fieldIsV);
  }
}, [formD]);
