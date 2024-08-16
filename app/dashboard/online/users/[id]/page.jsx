"use client";
import EditUserForm from "@/components/EditUserForm";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const EditPlayerDetails = ({ params }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = params;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user?id=${id}`);
        if (!response.ok) {
          throw new Error("Network response not OK " + response.statusText);
        }
        const { userData } = await response.json();
        setUserData(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Link className="mb-5" href="/dashboard/online">
        <button className="btn flex items-center">
          <FaArrowLeft />
          <span>Go Back</span>
        </button>
      </Link>
      {userData && <EditUserForm userId={id} userData={userData} collection={"form-submission"} route={"online"} />}
    </>
  );
};

export default EditPlayerDetails;
