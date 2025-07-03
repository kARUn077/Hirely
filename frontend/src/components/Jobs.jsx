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