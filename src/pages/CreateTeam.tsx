import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { TeamContext } from "../context/TeamContext.tsx";

import Spinner from "../components/Spinner";
import { createNewTeam } from "../firebase/post";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

const CreateTeam = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [teamname, setTeamname] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);

  const _auth = useAuth();
  const _toast = useToast();
  const navigate = useNavigate();

  const { teams, reloadTeams } = useContext(TeamContext) ?? {
    teams: null,
    reloadTeams: async () => {},
  };

  const isDisabled = teamname.length === 0 || !!nameError;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const duplicate = teams?.find((team) => team.teamname === e.target.value);
      if (duplicate) {
        setNameError("Team name already exists");
      } else {
        setNameError(null);
      }
      setTeamname(e.target.value);
    } else {
      setNameError("Team name is required");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!teamname.length) {
        setNameError("Team name is required");
        return;
      }
      setLoading(true);
      const team = await createNewTeam(teamname, _auth.user?.nickname || "");
      if (!team) {
        throw new Error("Failed to create team");
      }
      // Reload teams to include the newly created team
      await reloadTeams();
      _toast?.success("Team created successfully");
      navigate(`/team/${team.id}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create team";
      _toast?.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Spinner />}
      <div className="p-2 flex flex-col">
        <p className="text-sm font-light">
          Looks like you don't have a team yet. Let's start with the team
          name...{" "}
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className="my-2 flex flex-col">
          <input
            className={`rounded-md border-1 border-dark-blue p-2 h-10 mb-2 ${
              nameError ? "border-red-500" : ""
            }`}
            type="text"
            name="teamname"
            onChange={(e) => handleChange(e)}
            maxLength={30}
          />

          <button
            className="p-2 bg-aus-green text-white rounded disabled:opacity-50"
            disabled={isDisabled}
          >
            Create Team
          </button>
          {nameError && (
            <small className="text-xs text-red-500">{nameError}</small>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateTeam;
