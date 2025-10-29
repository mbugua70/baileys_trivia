const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://stark-garden-63439-342c9398264c.herokuapp.com";

export async function loginUser(creds) {
  const res = await fetch(`${API_BASE_URL}/api/players/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.error,
    };
  }

  return data;
}

// getting all question

export async function getQuestions() {
  const res = await fetch(`${API_BASE_URL}/api/questions`, {
    headers: {
      // Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw {
      message: "Failed to fetch questions",
      // statusText: res.statusText,
      // status: res.status
    };
  }
  const data = await res.json();
  return data;
}

// getting colors

export async function getColors() {
  const res = await fetch(`${API_BASE_URL}/api/colors`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw {
      message: "Failed to fetch colors",
      // statusText: res.statusText,
      // status: res.status
    };
  }
  const data = await res.json();
  return data;
}

export async function updatePlayer(updateData) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return;
  }

  const id = user.userId;
  try {
    const res = await fetch(`${API_BASE_URL}/api/players/signup/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      throw new Error("Failed to update the player");
    }

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    return error.message;
  }
}

export const fetchData = async () => {
  const [colors, questions] = await Promise.all([getColors(), getQuestions()]);
  return { colors, questions };
};
