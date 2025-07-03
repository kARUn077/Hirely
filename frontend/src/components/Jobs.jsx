import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';
import axios from 'axios';

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // ✅ Fetch saved (bookmarked) jobs
  const fetchBookmarkedJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/bookmarks', {
        withCredentials: true,
      });
      const ids = res.data.savedJobs.map(job => job._id);
      setBookmarkedIds(ids);
    } catch (err) {
      console.log('Error fetching bookmarks', err);
    }
  };

  // ✅ Fetch all jobs & bookmarks
  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/job/get', {
        withCredentials: true,
      });
      dispatch(setAllJobs(res.data.jobs));
      await fetchBookmarkedJobs(); // fetch saved jobs after jobs load
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Initial fetch on mount
  useEffect(() => {
    fetchJobs();
  }, []);

   // ✅ Filter jobs if search query changes
  useEffect(() => {
    const filterJobsBasedOnQuery = () => {
      if (!searchedQuery) {
        setFilterJobs(allJobs);
        return;
      }

      const locationQuery = searchedQuery.location?.trim().toLowerCase();
      const industryQuery = searchedQuery.industry?.trim().toLowerCase();
      const salaryRange = searchedQuery.salary;

      const filtered = allJobs.filter((job) => {
        const locationMatch = !locationQuery || (job.location && job.location.toLowerCase().includes(locationQuery));
        const industryMatch =
          !industryQuery ||
          job.industry?.toLowerCase().includes(industryQuery) ||
          job.title?.toLowerCase().includes(industryQuery);

        const salaryMatch = (() => {
          if (!salaryRange) return true;
          const [min, max] = JSON.parse(salaryRange);
          return job.salary >= min && job.salary <= max;
        })();

        return locationMatch && industryMatch && salaryMatch;
      });

      setFilterJobs(filtered);
    };

    filterJobsBasedOnQuery();
  }, [allJobs, searchedQuery]);

  // ✅ Add `isBookmarked` flag to each job before rendering
  const updatedJobs = filterJobs.map(job => ({
    ...job,
    isBookmarked: bookmarkedIds.includes(job._id),
  }));

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-6 px-4'>
        <div className='flex gap-6'>
          <div className='w-[22%]'>
            <FilterCard />
          </div>
          <div className='w-[78%]'>
            {updatedJobs.length === 0 ? (
              <p className='text-center text-gray-500 mt-10'>
                No jobs found matching your criteria.
              </p>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {updatedJobs.map((job) => (
                  <Job key={job._id} job={job} onBookmarkToggle={fetchJobs} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
