import { render, screen, waitFor } from "@testing-library/react";
import { describe, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import FollowingList from "../../src/pages/Profile/followingList";
import { getUserFollowingList } from '../../src/services/getUserFollowing';
import { getUserById } from '../../src/services/getUserById';
import { toggleFollowingServ } from '../../src/services/toggleFollowingServ';
import '@testing-library/jest-dom';

vi.mock('../../src/services/getUserFollowing', () => ({
  getUserFollowingList: vi.fn(),
}));

vi.mock('../../src/services/getUserById', () => ({
  getUserById: vi.fn(),
}));

vi.mock('../../src/services/toggleFollowingServ', () => ({
  toggleFollowingServ: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,  
  };
});

describe("FollowingList Component", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockReset();

    Object.defineProperty(window, 'location', {
      value: {
        reload: vi.fn(), // Mock reload function
      },
      writable: true,
    });
  });

  test("redirects to /login if token is missing", async () => {
    render(
      <MemoryRouter>
        <FollowingList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("displays the user's following list", async () => {
    localStorage.setItem("token", "mockToken");

    const mockFollowingList = [
      { _id: "follow1", username: "JohnDoe", profilepictureURL: "/john.jpg" },
      { _id: "follow2", username: "JaneDoe", profilepictureURL: "/jane.jpg" },
    ];

    getUserFollowingList.mockResolvedValue({ token: "newToken", user: "userId" });
    getUserById.mockResolvedValue(mockFollowingList);

    render(
      <MemoryRouter>
        <FollowingList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("JohnDoe")).toBeInTheDocument();
      expect(screen.getByText("JaneDoe")).toBeInTheDocument();
    });
  });

  test("displays a message when the user has no following", async () => {
    localStorage.setItem("token", "mockToken");

    getUserFollowingList.mockResolvedValue({ token: "newToken", user: "userId" });
    getUserById.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <FollowingList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("You have not followed anyone yet")).toBeInTheDocument();
    });
  });

  test("calls toggleFollowingServ when the delete button is clicked", async () => {
    localStorage.setItem("token", "mockToken");

    const mockFollowingList = [
      { _id: "follow1", username: "JohnDoe", profilepictureURL: "/john.jpg" },
    ];

    getUserFollowingList.mockResolvedValue({ token: "newToken", user: "userId" });
    getUserById.mockResolvedValue(mockFollowingList);

    render(
      <MemoryRouter>
        <FollowingList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    });

    const deleteButton = screen.getByText("Delete");
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(toggleFollowingServ).toHaveBeenCalledWith("newToken", "follow1");
    });

    expect(window.location.reload).toHaveBeenCalled();
  });
});
