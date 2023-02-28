
using backend.Data;
using backend.DTOs;
using backend.Entities;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    
    public class CalendarEventsController : BaseAPIController
    {
        private readonly IEventService _calendarEventService;
        public CalendarEventsController(IEventService calendarEventService ){
            _calendarEventService = calendarEventService;
        }
        

        [HttpGet]
        public  Task<IEnumerable<CalendarEvent>> GetCalendarEvents()
        {
            return   _calendarEventService.GetCalendarEventsAsync();
            //returns empty list if no events are found    
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<CalendarEvent>> GetCalendarEvent(int id)
        {
            CalendarEvent calendarEvent = await _calendarEventService.GetCalendarEventByIdAsync(id);
            if (calendarEvent == null)
            {
                return NotFound();
            }
            return calendarEvent;
        }

        [HttpPost("register")]
        public async Task<ActionResult<CalendarEvent>> RegisterEvent(CalendarEventDTO calendarEvent)
        {
            var newCalendarEvent = await _calendarEventService.CreateCalendarEventAsync(calendarEvent);
            if (newCalendarEvent == null)
            {
                return BadRequest();
            }
            return newCalendarEvent;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var isDeleted = await _calendarEventService.DeleteCalendarEventAsync(id);
            if (isDeleted == false)
            {
                return BadRequest();
            }
            return isDeleted;
        }

        
        [HttpPut("update")]
        public async Task<ActionResult<CalendarEvent>> Update(CalendarEventDTO calendarEvent)
        {
            
            var updatedCalendarEvent = await _calendarEventService.UpdateCalendarEventAsync(calendarEvent);
            if (updatedCalendarEvent == null)
            {
                return BadRequest();
            }
            return updatedCalendarEvent;
            
        }
        [HttpGet("month/{month}/{year}")]
        public async Task<ActionResult<IEnumerable<CalendarEvent>>> GetCalendarEventByMonth(string month,string year)
        {
            var calendarEvents = await _calendarEventService.GetCalendarEventByMonthAndYearAsync(month,year);
            if (calendarEvents == null)
            {
                return NotFound();
            }
            return calendarEvents.ToList();
        }
        [HttpGet("day/{day}/{month}/{year}")]
        public async Task<ActionResult<IEnumerable<CalendarEvent>>> GetCalendarEventByDay(string day,string month,string year)
        {
            var calendarEvents = await _calendarEventService.GetCalendarEventsByDayAsync(day,month,year);
            if (calendarEvents == null)
            {
                return NotFound();
            }
            return calendarEvents.ToList();
        }
    }
}