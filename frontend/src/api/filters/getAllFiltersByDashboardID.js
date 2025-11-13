import axios from "axios";

const getAllFiltersByDashboardID = async (dashboardId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await axios.get(
      "http://localhost:8080/filter/getfiltersbydashID",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { id: dashboardId },
      }
    );

    return response.data.Data || [];
  } catch (error) {
    console.error("Error fetching filters:", error);
    throw error;
  }
};

export default getAllFiltersByDashboardID;
