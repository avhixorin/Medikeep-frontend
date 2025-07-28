import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { User } from "@/types/types";
import { useNavigate } from "react-router-dom";

const MedicalRecords = () => {
  const [entities, setEntities] = useState<User[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
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
          <div className="flex justify-center items-center h-full text-muted-foreground text-center">
            No available {user?.role === "Doctor" ? "doctors" : "patients"}. You
            need to have at least one{" "}
            {user?.role === "Doctor" ? "doctor" : "patient"} to upload
            prescriptions.
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {
              entities.length > 0 &&
              entities.map((entity) => (
                <li
                  key={entity._id}
                  className="flex items-center justify-between bg-muted px-4 py-2 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/dashboard/records/${entity._id}`)}
                >
                  <span className="text-sm text-foreground truncate max-w-xs">
                    {entity.firstName} {entity.lastName}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-destructive/10 transition-colors"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      // removeFile(patient._id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
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
