using Microsoft.EntityFrameworkCore;
using shoppinglistAPI.Models;

namespace shoppinglistAPI.Data
{
    public class ShoppinglistDbContext : DbContext
    {
        public ShoppinglistDbContext(DbContextOptions<ShoppinglistDbContext> options)
            : base(options)
        {
        }

        public DbSet<Shopping> shopping { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Shopping>().HasKey(e => e.Id);
        }
    }
}
