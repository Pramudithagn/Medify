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
    .init({ onLoad: "login-required", pkceMethod: 'S256' })
    .then((authenticated) => {
      if (authenticated) {
        onAuthenticatedCallback();
        console.log("Token after authentication:", keycloakInstance.token);
      } else {
        alert("Non authenticated");
      }
    })
    .catch((e) => {
      console.dir(e);
      console.log(`Keycloak init exception: ${e}`);
    });
};

const Logout = () => {
  if (keycloakInstance) {
    keycloakInstance.logout();
  }
};

const GetAccessToken = () => {
  console.log(keycloakInstance)
  console.log(keycloakInstance.tokenParsed)
  if (keycloakInstance.token) {
    console.log("Token authentication when requesting:", keycloakInstance.token);
    return keycloakInstance.token;
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
}

const getUser = async() => {
  if (keycloakInstance && keycloakInstance.tokenParsed) {
    const realmRoles = keycloakInstance.tokenParsed.realm_access?.roles || [];
    const resourceRoles = keycloakInstance.tokenParsed.resource_access?.account?.roles || [];
    // const resourceRoles = keycloakInstance.tokenParsed.resource_access?.[`${keycloakInstance.realm}`]?.roles || [];
    
    const userRoles = [...realmRoles, ...resourceRoles];
    console.log("User roles:", userRoles);

    const matchedRole = userRoles.find(role => ["ADMIN", "DOCTOR", "PATIENT"].includes(role));
    const userRole = matchedRole ? matchedRole : "user-role unknown";
    console.log(userRole)

    // const username = keycloakInstance.tokenParsed?.preferred_username
    const userName = keycloakInstance.tokenParsed?.name

    // let userDetails = {};

    // if (userRole === "PATIENT") {
    //   userDetails = getPatientByUuid(keycloakInstance.subject);
    // } else if (userRole === "DOCTOR") {
    //   userDetails = getDoctorByUuid(keycloakInstance.subject);
    // }

    // const docDetails = await getDoctorByUuid(keycloakInstance.subject)
    // const patientDetails = await getPatientByUuid(keycloakInstance.subject)

    const userDetails = await fetchUser(userRole)
    console.log(userDetails)

    // return {userRoles};
    console.log(userRole)

    return {...userDetails, userRole:userRole, userName:userName};
    // return { userRole: userRole, userName:userName};
  } else {
    console.warn("User roles not available. Make sure the user is authenticated.");
    return [];
  }

};


const keyCloakService = {
  callLogin: Login,
  // getUserName: UserName,
  getUser: getUser,
  getAccessToken: GetAccessToken,
  logout: Logout,
};

export default keyCloakService;
