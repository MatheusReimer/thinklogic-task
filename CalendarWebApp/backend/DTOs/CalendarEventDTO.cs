

namespace backend.DTOs
{
    public class CalendarEventDTO
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public  DateTime CreatedAt { get; set; }
    }
}