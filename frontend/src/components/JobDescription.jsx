import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const [selectedResume, setSelectedResume] = useState(null)
  const [isApplying, setIsApplying] = useState(false)

  const isInitiallyApplied =
    singleJob?.applications?.some(app => app.applicant === user?._id) || false

  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    if (!selectedResume) {
      return toast.error('Please upload your resume before applying.')
    }

    try {
      setIsApplying(true)
      const formData = new FormData()
      formData.append('file', selectedResume)

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )

      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || 'Something went wrong.')
    } finally {
      setIsApplying(false)
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(
            res.data.job.applications.some(app => app.applicant === user?._id)
          )
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant='ghost'>
              {singleJob?.postion} Positions
            </Badge>
            <Badge className='text-[#F83002] font-bold' variant='ghost'>
              {singleJob?.jobType}
            </Badge>
            <Badge className='text-[#7209b7] font-bold' variant='ghost'>
              {singleJob?.salary
                ? `${(singleJob.salary / 100000).toFixed(1)} LPA`
                : 'N/A'}
            </Badge>
          </div>
        </div>

        <div className='flex flex-col gap-2 items-end'>
          <input
            type='file'
            accept='.pdf'
            onChange={e => setSelectedResume(e.target.files[0])}
            className='text-sm'
          />
          <Button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied || isApplying}
            className={`rounded-lg ${
              isApplied
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-[#7209b7] hover:bg-[#5f32ad]'
            }`}
          >
            {isApplied ? 'Already Applied' : isApplying ? 'Applying...' : 'Apply Now'}
          </Button>
        </div>
      </div>