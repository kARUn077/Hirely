import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const Job = ({ job, onBookmarkToggle }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(job?.isBookmarked || false);

 // ✅ ADD THIS useEffect RIGHT HERE
  useEffect(() => {
    setSaved(job?.isBookmarked || false);
  }, [job?.isBookmarked]);


  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const handleToggleSave = async () => {
    try {
      if (!saved) {
        await axios.post(`http://localhost:8000/api/v1/user/bookmark/${job?._id}`, {}, {
          withCredentials: true,
        });
        toast.success('Job saved successfully!');
        setSaved(true);

        navigate("/saved-jobs");


        if (onBookmarkToggle) onBookmarkToggle();  // ✅ Refresh job list
      } else {
        await axios.delete(`http://localhost:8000/api/v1/user/unbookmark/${job?._id}`, {
          withCredentials: true,
        });
        toast.success('Job removed from saved list!');
        setSaved(false);
        if (onBookmarkToggle) onBookmarkToggle();  // ✅ Refresh job list
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Job already bookmarked');
    }
  };

  return (
    <div className='p-5 rounded-md shadow-lg bg-[#f4e1d2] border border-[#d3b29d] h-full flex flex-col justify-between'>
      <div>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-[#7e6c53]'>
            {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
          <Button variant="outline" className="rounded-full" size="icon" onClick={handleToggleSave}>
            {saved ? <BookmarkCheck className="text-[#6b4f32]" /> : <Bookmark className="text-[#6b4f32]" />}
          </Button>
        </div>

        <div className='flex items-center gap-2 my-2'>
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div>
            <h1 className='font-medium text-lg text-[#5a4432]'>{job?.company?.name}</h1>
            <p className='text-sm text-[#7e6c53]'>India</p>
          </div>
        </div>

        <div>
          <h1 className='font-bold text-xl my-2 text-[#3e2c1c]'>{job?.title}</h1>
          <p className='text-sm text-[#6f4f33]'>{job?.description}</p>
        </div>

        <div className='flex items-center gap-2 mt-4 flex-wrap'>
          <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
          <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
          <Badge className='text-[#7209b7] font-bold' variant="ghost">
            {job?.salary ? `${(job.salary / 100000).toFixed(1)} LPA` : 'N/A'}
          </Badge>
        </div>
      </div>

      <div className='flex items-center gap-4 mt-auto pt-4'>
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-[#6b4f32] hover:bg-[#e2c8a1] border-[#6b4f32] hover:border-[#5a3f29] transition-all duration-300 ease-in-out px-6 py-2"
        >
          <span className="text-[#6b4f32] font-medium">Details</span>
        </Button>
        <Button
          onClick={handleToggleSave}
          className="bg-[#6b4f32] hover:bg-[#5a3f29] text-white transition-all duration-300 ease-in-out px-6 py-2"
        >
          {saved ? (
            <>
              <BookmarkCheck size={18} className="mr-2" />
              Saved
            </>
          ) : (
            'Save For Later'
          )}
        </Button>
      </div>
    </div>
  );
};

export default Job;
