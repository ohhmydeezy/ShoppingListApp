using System;
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

        public DbSet<Shopping> ShoppingList { get; set; }
    }
}
