using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoppinglistAPI.Data;
using shoppinglistAPI.Models;
using System;
using System.Threading.Tasks;

namespace shoppinglistAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingController : ControllerBase
    {
        private readonly ShoppinglistDbContext _shoppinglistDbContext;

        public ShoppingController(ShoppinglistDbContext shoppinglistDbContext)
        {
            _shoppinglistDbContext = shoppinglistDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllShopping()
        {
            var shoppingItems = await _shoppinglistDbContext.ShoppingList.ToListAsync();
            return Ok(shoppingItems);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] Shopping itemRequest)
        {
            itemRequest.Id = Guid.NewGuid();
            await _shoppinglistDbContext.ShoppingList.AddAsync(itemRequest);
            await _shoppinglistDbContext.SaveChangesAsync();

            return Ok(itemRequest);
        }
    }
}


