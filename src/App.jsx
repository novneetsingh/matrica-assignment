import { useState } from "react";
import SubmissionForm from "./components/SubmissionForm";
import SubmissionsList from "./components/SubmissionsList";
import SuccessModal from "./components/SuccessModal";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState(null);
  const [refreshList, setRefreshList] = useState(0);

  const handleSubmitSuccess = (submission) => {
    setLatestSubmission(submission);
    setShowModal(true);
    setRefreshList((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLatestSubmission(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Matrica Tech Internship
          </h1>
          <p className="text-gray-600">
            Complete the form below to submit your application
          </p>
        </div>

        {/* Form Section */}
        <div className="mb-12">
          <SubmissionForm onSubmitSuccess={handleSubmitSuccess} />
        </div>

        {/* Submissions List Section */}
        <div>
          <SubmissionsList key={refreshList} />
        </div>

        {/* Success Modal */}
        {showModal && (
          <SuccessModal
            submission={latestSubmission}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default App;
