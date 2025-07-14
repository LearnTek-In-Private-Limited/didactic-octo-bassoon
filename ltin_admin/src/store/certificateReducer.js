import {
  FETCH_CERTIFICATES,
  ADD_CERTIFICATE,
  UPDATE_CERTIFICATE,
  DELETE_CERTIFICATE,
  VERIFY_CERTIFICATE
} from "../components/actions/certifcateActions";

const initialState = {
  certificates: [],
  verifiedCertificate: null,
};

const certificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CERTIFICATES:
      return { ...state, certificates: action.payload };

    case ADD_CERTIFICATE:
      return { ...state, certificates: [...state.certificates, action.payload] };

    case UPDATE_CERTIFICATE:
      return {
        ...state,
        certificates: state.certificates.map((certificate) =>
          certificate.certificateId === action.payload.certificateId
            ? { ...certificate, ...action.payload.updatedData }
            : certificate
        ),
      };

    case DELETE_CERTIFICATE:
      return {
        ...state,
        certificates: state.certificates.filter(
          (certificate) => certificate.certificateId !== action.payload
        ),
      };

    case VERIFY_CERTIFICATE:
      return { ...state, verifiedCertificate: action.payload };

    default:
      return state;
  }
};

export default certificateReducer;
