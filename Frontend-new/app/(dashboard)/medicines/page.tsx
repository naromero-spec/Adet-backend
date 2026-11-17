
import ModulePage from "@/components/Modulepage";

export default function MedicinesPage() {
  return (
    <ModulePage
      title="Medicines"
      description="Manage hospital medicine inventory."
      columns={[
        "Medicine ID",
        "Medicine Name",
        "Category",
        "Quantity",
        "Price",
        "Expiration Date",
      ]}
    />
  );
}
