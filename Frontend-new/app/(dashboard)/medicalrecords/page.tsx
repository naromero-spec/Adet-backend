
import ModulePage from "@/components/Modulepage";

export default function MedicalRecordsPage() {
  return (
    <ModulePage
      title="Medical Records"
      description="View and manage patient medical histories."
      columns={[
        "Record ID",
        "Patient",
        "Doctor",
        "Diagnosis",
        "Treatment",
        "Record Date",
      ]}
    />
  );
}
