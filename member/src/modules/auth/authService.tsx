import authAxios from "@modules/shared/axios/authAxios";
import { AuthToken } from "@modules/auth/authToken";
import AuthCurrentTenant from "@modules/auth/authCurrentTenant";
import AuthInvitationToken from "@modules/auth/authInvitationToken";

export default class AuthService {
  static async sendEmailVerification() {
    const response = await authAxios.post(
      "/auth/send-email-address-verification-email",
      {
        tenantId: AuthCurrentTenant.get(),
      }
    );
    return response.data;
  }

  static async sendPasswordResetEmail(email) {
    const response = await authAxios.post("/auth/send-password-reset-email", {
      email,
      tenantId: AuthCurrentTenant.get(),
    });
    return response.data;
  }

  static async registerWithEmailAndPassword(email, password) {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post("/auth/sign-up", {
      email,
      password,
      invitationToken,
      tenantId: AuthCurrentTenant.get(),
    });

    AuthInvitationToken.clear();

    return response.data;
  }

  static async signinWithEmailAndPassword(email, password) {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post("/auth/sign-in", {
      email,
      password,
      invitationToken,
      tenantId: AuthCurrentTenant.get(),
    });

    AuthInvitationToken.clear();

    return response.data;
  }

  static async fetchMe() {
    const response = await authAxios.get("/auth/me");
    return response.data;
  }

  static signout() {
    AuthToken.set(null, true);
  }

  static async updateProfile(data) {
    const body = {
      data,
    };

    const response = await authAxios.put("/auth/profile", body);

    return response.data;
  }

  static async changePassword(oldPassword, newPassword) {
    const body = {
      oldPassword,
      newPassword,
    };

    const response = await authAxios.put("/auth/change-password", body);

    return response.data;
  }

  static async passwordReset(token, password) {
    const response = await authAxios.put("/auth/password-reset", {
      token,
      password,
      tenantId: AuthCurrentTenant.get(),
    });

    return response.data;
  }

  static async verifyEmail(token) {
    const response = await authAxios.put("/auth/verify-email", {
      token,
      tenantId: AuthCurrentTenant.get(),
    });

    return response.data;
  }

  static async socialOnboard() {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post("/auth/social/onboard", {
      invitationToken,
      tenantId: AuthCurrentTenant.get(),
    });

    AuthInvitationToken.clear();

    return response.data;
  }

  static isSocialOnboardRequested() {
    const urlParams = new URLSearchParams(window.location.search);

    return Boolean(urlParams.get("social"));
  }
}
