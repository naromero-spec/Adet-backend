
import ModulePage from "@/components/Modulepage";

export default function DoctorsPage() {
  return (
    <ModulePage
      title="Doctors"
      description="Manage hospital doctors and their information."
      columns={[
        "Doctor ID",
        "Doctor Name",
        "Department",
        "Specialization",
        "Phone",
        "Email",
      ]}
    />
  );
}
