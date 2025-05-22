import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

     return (
        <div className='p-5 rounded-md shadow-lg bg-[#f4e1d2] border border-[#d3b29d] h-full flex flex-col justify-between'>
            <div>
                {/* Top Row - Posted Time and Bookmark */}
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-[#7e6c53]'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                    <Button variant="outline" className="rounded-full" size="icon">
                        <Bookmark className="text-[#6b4f32]" />
                    </Button>
                </div>

                {/* Company Info */}
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

                {/* Job Title and Description */}
                <div>
                    <h1 className='font-bold text-xl my-2 text-[#3e2c1c]'>{job?.title}</h1>
                    <p className='text-sm text-[#6f4f33]'>{job?.description}</p>
                </div>

                {/* Badges */}
                <div className='flex items-center gap-2 mt-4 flex-wrap'>
                    <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
                    <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                    <Badge className='text-[#7209b7] font-bold' variant="ghost">
                        {job?.salary ? `${(job.salary / 100000).toFixed(1)} LPA` : 'N/A'}
                    </Badge>
                </div>
            </div>

            {/* Buttons */}
            <div className='flex items-center gap-4 mt-auto pt-4'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="text-[#6b4f32] hover:bg-[#e2c8a1] border-[#6b4f32] hover:border-[#5a3f29] transition-all duration-300 ease-in-out px-6 py-2"
                >
                    <span className="text-[#6b4f32] font-medium">Details</span>
                </Button>
                <Button className="bg-[#6b4f32] hover:bg-[#5a3f29] text-white transition-all duration-300 ease-in-out px-6 py-2">
                    Save For Later
                </Button>
            </div>
        </div>
    )
}

export default Job
