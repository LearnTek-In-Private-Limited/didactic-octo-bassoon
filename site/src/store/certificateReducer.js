import { VERIFY_CERTIFICATE } from "../Components/actions/verifyCertificate";

const initialState = {
  certificates: [], // Placeholder for other features
  verifiedCertificate: null,
};

const certificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_CERTIFICATE:
      return { ...state, verifiedCertificate: action.payload };

    default:
      return state;
  }
};

export default certificateReducer;
