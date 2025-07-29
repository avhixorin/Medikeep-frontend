import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { User } from "@/types/types";
import { useNavigate } from "react-router-dom";
import usePartialUserData from "@/hooks/usePartialUserData";

const MedicalRecords = () => {
  const [entities, setEntities] = useState<User[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const { fetchPartialUserData } = usePartialUserData();
  useEffect(() => {
    if (user?.role === "doctor") {
      if (!user?.patients) {
        fetchPartialUserData("patients");
      }
    } else {
      if (!user?.doctors) {
        fetchPartialUserData("doctors");
      }
    }
  }, [fetchPartialUserData, user?.doctors, user?.patients, user?.role]);
  useEffect(() => {
    if (user?.role === "doctor") {
      setEntities(user.patients ?? []);
    } else {
      setEntities(user?.doctors ?? []);
    }
  }, [user?.role, user?.patients, user?.doctors]);
  console.log("Entities:", entities);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full p-6 shadow-md bg-transparent flex flex-col gap-6">
      <div>
        <h1 className="text-lg md:text-2xl font-semibold text-foreground">
          {" "}
          Medical Records
        </h1>
      </div>

      <div className="flex-1 w-full mt-6">
        {entities.length === 0 ? (
          <div className="flex justify-center items-center h-full text-muted-foreground text-center px-4">
            No available {user?.role === "Doctor" ? "doctors" : "patients"}. You
            need to have at least one{" "}
            <span className="font-medium text-foreground">
              {user?.role === "Doctor" ? "doctor" : "patient"}
            </span>{" "}
            to upload prescriptions.
          </div>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {entities.map((entity) => (
              <li
                key={entity._id}
                className="bg-muted rounded-2xl p-4 shadow-md hover:shadow-lg flex flex-col justify-between"
                onClick={() => navigate(`/dashboard/records/${entity._id}`)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={entity.profilePicture}
                    alt={`${entity.firstName} ${entity.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-foreground font-semibold text-base truncate">
                    {entity?.role === "doctor" ? "Dr. " : ""}
                    {entity.firstName} {entity.lastName}
                  </div>
                </div>

                <Button
                  size="sm"
                  className="self-end mx-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/records/${entity._id}`);
                  }}
                >
                  View Records
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
