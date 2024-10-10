import Keycloak from "keycloak-js";
import { getDoctorByUuid } from "../controllers/doctors.controller";
import { getPatientByUuid } from "../controllers/patients.controller";

const keycloakInstance = new Keycloak();

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const Login = (onAuthenticatedCallback) => {
  keycloakInstance
    .init({ onLoad: "login-required", pkceMethod: "S256" })
    .then(async (authenticated) => {
      if (authenticated) {
        localStorage.setItem("token", keycloakInstance.token);
        const user = await getUser();
        localStorage.setItem("userDetails", JSON.stringify(user));
        onAuthenticatedCallback();
      } else {
        alert("Non authenticated");
      }
    })
    .catch((e) => {
      console.error(`Keycloak init exception: ${e}`);
    });
};

const Logout = () => {
  if (keycloakInstance) {
    keycloakInstance.logout();
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
  }
};

const GetAccessToken = () => {
  if (keycloakInstance.token) {
    return localStorage.getItem("token");
  } else {
    console.warn("Token is undefined. Make sure the user is authenticated.");
    return null;
  }
};

const fetchUser = async (userRole) => {
  let userDetails = {};

  if (userRole === "PATIENT") {
    userDetails = await getPatientByUuid(keycloakInstance.subject);
  } else if (userRole === "DOCTOR") {
    userDetails = await getDoctorByUuid(keycloakInstance.subject);
  }

  return userDetails.data;
};

const getUser = async () => {
  if (keycloakInstance && keycloakInstance.tokenParsed) {
    const realmRoles = keycloakInstance.tokenParsed.realm_access?.roles || [];
    const resourceRoles =
      keycloakInstance.tokenParsed.resource_access?.account?.roles || [];
    // const resourceRoles = keycloakInstance.tokenParsed.resource_access?.[`${keycloakInstance.realm}`]?.roles || [];

    const userRoles = [...realmRoles, ...resourceRoles];
    const matchedRole = userRoles.find((role) =>
      ["ADMIN", "DOCTOR", "PATIENT"].includes(role)
    );
    const userRole = matchedRole ? matchedRole : "user-role unknown";
    // const username = keycloakInstance.tokenParsed?.preferred_username
    const userName = keycloakInstance.tokenParsed?.name;
    const userDetails = await fetchUser(userRole);
    return { ...userDetails, userRole: userRole, userName: userName };
  } else {
    console.warn(
      "User roles not available. Make sure the user is authenticated."
    );
    return [];
  }
};

const keyCloakService = {
  callLogin: Login,
  getUser: getUser,
  getAccessToken: GetAccessToken,
  logout: Logout,
};

export default keyCloakService;
