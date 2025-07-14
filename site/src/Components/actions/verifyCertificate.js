import { db } from "../../firebase"; // Firestore instance
import { collection, getDocs, query, where } from "firebase/firestore";

export const VERIFY_CERTIFICATE = "VERIFY_CERTIFICATE";

// Verify Certificate Action
export const verifyCertificate = (certificateId) => async (dispatch) => {
  try {
    const certQuery = query(
      collection(db, "certificates"),
      where("certificateId", "==", certificateId)
    );
    const querySnapshot = await getDocs(certQuery);

    if (!querySnapshot.empty) {
      const certificate = querySnapshot.docs[0].data();
      dispatch({ type: VERIFY_CERTIFICATE, payload: certificate });
      return Promise.resolve(certificate);
    } else {
      return Promise.reject(new Error("Certificate not found"));
    }
  } catch (error) {
    console.error("Error verifying certificate:", error);
    return Promise.reject(error);
  }
};
