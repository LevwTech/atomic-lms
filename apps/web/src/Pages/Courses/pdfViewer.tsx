import Announcements from "@atomic/web-ui/Announcements/Announcements";
import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import Courses from "./Courses";
import ReactLoading from "react-loading";
import { useQuery } from "@tanstack/react-query";
import { USER_TYPES, useUserStore } from "../../store/user.store";
import { useParams } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

function PdfViewerPage() {
  const user = useUserStore();
  const { courseId, sectionId, attachmentId } = useParams();

  const { isLoading, data: attachment } = useQuery({
    queryKey: ["attachments", { courseId, sectionId, attachmentId }],
    queryFn: () =>
      fetch(
        `http://localhost:3000/course-marerial/${courseId}/section/${sectionId}/attachment/${attachmentId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }
  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <Sidebar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className="h-full w-[85vw] rounded-[14px] items-center flex flex-col bg-white p-[30px] gap-[30px]">
        <PDFViewer>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Section #1</Text>
              </View>
              <View style={styles.section}>
                <Text>Section #2</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
}

export default PdfViewerPage;
