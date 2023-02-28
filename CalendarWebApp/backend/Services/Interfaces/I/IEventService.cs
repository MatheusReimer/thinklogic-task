

using backend.DTOs;
using backend.Entities;

namespace backend.Services.Interfaces
{
    public interface IEventService
    {
        public Task<CalendarEvent> CreateCalendarEventAsync(CalendarEventDTO calendarEvent);
        public Task<CalendarEvent> UpdateCalendarEventAsync(CalendarEventDTO calendarToUpdate);
        public Task<bool> DeleteCalendarEventAsync(int id);
        public Task<CalendarEvent> GetCalendarEventByIdAsync(int id);
        public Task<IEnumerable<CalendarEvent>> GetCalendarEventByMonthAndYearAsync(string month, string year);
        public Task<IEnumerable<CalendarEvent>>GetCalendarEventsAsync();
        public Task<IEnumerable<CalendarEvent>> GetCalendarEventsByDayAsync(string day, string month, string year);
    }
}