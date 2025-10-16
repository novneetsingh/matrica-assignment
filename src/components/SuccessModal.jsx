const SuccessModal = ({ submission, onClose }) => {
  if (!submission) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Submission Successful!
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Your application has been submitted successfully and PDF has been
            generated.
          </p>

          {/* Submission Details */}
          <div className="bg-gray-50 rounded-md p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Name:</span> {submission.fullName}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Email:</span>{" "}
              {submission.emailAddress}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Submitted:</span>{" "}
              {submission.dateOfSubmission}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {submission.pdfLink && (
              <a
                href={submission.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Download PDF
              </a>
            )}
            <button
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
