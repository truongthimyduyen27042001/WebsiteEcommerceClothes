using Microsoft.EntityFrameworkCore;

namespace ECommerceBE.Models
{
    public class TodoContext: DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
           : base(options)
        {
        }
    }
}
