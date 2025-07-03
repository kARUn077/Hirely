import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const renderStatusIcon = (status) => {
        switch(status) {
            case 'accepted':
                return <CheckCircle className="text-green-500" />;
            case 'rejected':
                return <XCircle className="text-red-500" />;
            case 'pending':
                return <Clock className="text-yellow-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl my-5 p-6 max-w-4xl mx-auto">
            <Table className="min-w-full">
                <TableCaption className="text-lg font-semibold text-gray-700">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-600">Job Role</TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-600">Company</TableHead>
                        <TableHead className="px-6 py-3 text-right text-sm font-medium text-gray-600">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length === 0
                        ? <TableRow><TableCell colSpan={4} className="text-center py-4 text-gray-500">You haven't applied to any jobs yet.</TableCell></TableRow>
                        : allAppliedJobs.map((appliedJob) => (
<TableRow key={appliedJob._id} className="hover:bg-[#f8e9dd] transition-all duration-200 cursor-pointer">
<TableCell className="px-6 py-4 text-sm text-gray-800">{formatDate(appliedJob?.createdAt)}</TableCell>
                                <TableCell className="px-6 py-4 text-sm text-gray-800">{appliedJob.job?.title}</TableCell>
                                <TableCell className="px-6 py-4 text-sm text-gray-800">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="px-6 py-4 text-right text-sm">
                                    <Badge className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${appliedJob?.status === "rejected" ? 'bg-red-400 text-white' : appliedJob.status === 'pending' ? 'bg-gray-400 text-white' : 'bg-green-400 text-white'}`}>
                                        {renderStatusIcon(appliedJob?.status)}
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobTable;
