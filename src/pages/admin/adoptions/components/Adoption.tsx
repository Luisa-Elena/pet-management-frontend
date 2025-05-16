import "./Adoption.css";

type Adoption = {
  id: string;
  userEmail: string;
  petName: string;
  status: "PENDING" | "ACCEPTED";
  adoptionTimestamp: string;
};

type Props = {
  adoption: Adoption;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
};

export default function Adoption({ adoption, onAccept, onReject }: Props) {
  return (
    <div className="adoption-card">
        <div className="adoption-info">
            <p><strong>User:</strong> {adoption.userEmail}</p>
            <p><strong>Pet:</strong> {adoption.petName}</p>
            <p>
            <strong>Status:</strong>{" "}
            <span className={`status ${adoption.status.toLowerCase()}`}>
                {adoption.status}
            </span>
            </p>
        </div>

        {adoption.status === "PENDING" && (
            <div className="action-buttons">
            <button className="accept-btn" onClick={() => onAccept(adoption.id)}>
                Accept
            </button>
            <button className="reject-btn" onClick={() => onReject(adoption.id)}>
                Reject
            </button>
            </div>
        )}
        </div>
  );
}
