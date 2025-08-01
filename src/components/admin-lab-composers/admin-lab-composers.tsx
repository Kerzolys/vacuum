import useSWR from "swr";
import styles from "./admin-lab-composers.module.scss";
import { fetchComposerApplications } from "../../services/fetcher/fetcher";
import { LabApplicantBlockUI } from "../ui/lab-applicant-block-ui/lab-applicant-block-ui";
import { PreloaderUI } from "../ui/preloader-ui/preloader-ui";

export const AdminLabComposers = () => {
  const { data, error, isLoading } = useSWR(
    "labComposers",
    fetchComposerApplications
  );

  if (isLoading) return <PreloaderUI />;

  return (
    <div className={styles.container}>
      {data?.map((d) => <LabApplicantBlockUI data={d} key={d.id} />)}
    </div>
  );
};
