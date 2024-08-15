// pages/api/appointments/check.js
import { NextResponse } from 'next/server';
import { getData } from '@/app/helpers/verifyJWT';
import { Appointment } from '@/app/models/appointment.model';
import { User } from '@/app/models/user.model';

export async function GET(request) {
  try {
    const userId = await getData(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await User.findById(userId);
    if (user?.isAdmin) {
      return NextResponse.json({ canCall: true });
    }

    const currentTime = new Date();
    const appointment = await Appointment.findOne({
      userId,
      status: { $in: ['accepted', 'rescheduled'] },
      date: { $eq: currentTime.toISOString().split('T')[0] }
    });
    console.log(appointment)

    if (appointment) {
      // Construct appointmentTime by setting the time part
      const appointmentTime = new Date(appointment.date);
      const [hours, minutes] = appointment.time.split(':');
      appointmentTime.setHours(parseInt(hours, 10));
      appointmentTime.setMinutes(parseInt(minutes, 10));
      appointmentTime.setSeconds(0);
      appointmentTime.setMilliseconds(0);

      const endTime = new Date(appointmentTime.getTime() + 60 * 60 * 1000); // Add 1 hour to appointment time
      console.log(currentTime + " " + appointmentTime + " " + endTime)

      if (currentTime >= appointmentTime && currentTime <= endTime) {
        return NextResponse.json({ canCall: true });
      }
    }
    
    return NextResponse.json({ canCall: false });
  } catch (error) {
    console.error('Error in appointment check:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
