
using backend.Data;
using backend.DTOs;
using backend.Entities;
using backend.Services.Interfaces;
using CalendarWebApp.Constants;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class EventService : IEventService
    {
        private readonly DataContext _context;
        public EventService(DataContext context)
        {
            _context = context;
        }

        public async Task<CalendarEvent> CreateCalendarEventAsync(CalendarEventDTO calendarEvent)
        {
            if (!Validation(calendarEvent))
            {
                throw new Exception(Constants.ERROR_MESSAGE_MISSING_INPUTS);
            }
            try
            {
                var newCalendarEvent = new CalendarEvent
                {
                    StartDate = calendarEvent.StartDate,
                    EndDate = calendarEvent.EndDate,
                    Title = calendarEvent.Title,
                    Description = calendarEvent.Description,
                    Location = calendarEvent.Location,
                };
                _context.CalendarEvents.Add(newCalendarEvent);
                await _context.SaveChangesAsync();
                return newCalendarEvent;
            }
            catch (Exception e)
            {
                throw new Exception(Constants.UNEXPECTED_ERROR + e.Message);
            }
        }

        public async Task<bool> DeleteCalendarEventAsync(int id)
        {
            try
            {
                var user = await _context.CalendarEvents.FindAsync(id);
                if (user == null)
                {
                    throw new Exception(Constants.ERROR_MESSAGE_EVENT_NOT_FOUND);
                }
                _context.CalendarEvents.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }

        public async Task<IEnumerable<CalendarEvent>> GetCalendarEventByMonthAndYearAsync(string month, string year)
        {
            var events = await _context.CalendarEvents.Where(x => x.StartDate.Month == int.Parse(month) && x.StartDate.Year == int.Parse(year)).ToListAsync();
            return events;
        }

        public async Task<CalendarEvent> GetCalendarEventByIdAsync(int id)
        {
            var user = await _context.CalendarEvents.FindAsync(id);
            return user;
        }

        public async Task<IEnumerable<CalendarEvent>> GetCalendarEventsAsync()
        {
            return await _context.CalendarEvents.ToListAsync();
        }

        public async Task<IEnumerable<CalendarEvent>> GetCalendarEventsByDayAsync(string day, string month, string year)
        {
            return await _context.CalendarEvents.Where(x => x.StartDate.Day == int.Parse(day) && x.StartDate.Month == int.Parse(month) && x.StartDate.Year == int.Parse(year)).ToListAsync();
        }

        public async Task<CalendarEvent> UpdateCalendarEventAsync(CalendarEventDTO calendarToUpdate)
        {
            var user = await _context.CalendarEvents.FindAsync(calendarToUpdate.Id);
            if (!Validation(calendarToUpdate))
            {
                throw new Exception(Constants.ERROR_MESSAGE_MISSING_INPUTS);
            }
            if (user == null)
            {
                throw new Exception(Constants.ERROR_MESSAGE_EVENT_NOT_FOUND);
            }
            user.StartDate = calendarToUpdate.StartDate;
            user.EndDate = calendarToUpdate.EndDate;
            user.Title = calendarToUpdate.Title;
            user.Description = calendarToUpdate.Description;
            user.Location = calendarToUpdate.Location;

            await _context.SaveChangesAsync();
            return user;
        }

        private bool Validation(CalendarEventDTO calendarEvent)
        {
            if (calendarEvent.StartDate == new DateTime() || calendarEvent.EndDate == new DateTime() || calendarEvent.Title == string.Empty || calendarEvent.Description == string.Empty || calendarEvent.Location == string.Empty)
            {
                return false;
            }
            return true;
        }

    }
}