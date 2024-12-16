using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SportSchool.API.Data;
using SportSchool.API.Entities;
using SportSchool.API.Interfaces;
using SportSchool.API.Repositories;

namespace SportSchool.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        //private readonly SportSchoolScheduleDBContext _context;
        private readonly IUserRepository _repo;
        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }


        [HttpGet("getUsers")]
        // GET: Users
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(_repo.GetUsers());
        }

        [HttpGet("getUserById")]

        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var result = _repo.GetUserById(id);
            if(result == null)
            {
                return BadRequest("Юзер не найден");
            }
            else
            {
                return Ok(_repo.GetUserById(id));
            }
            
        }


        [HttpPost("newUser")]

        public async Task<ActionResult<User>> CreateUser(User user)
        {
            return Ok(_repo.CreateUser(user));
        }

        [HttpDelete("deleteUser")]

        public async Task<ActionResult<bool>> DeleteUser(Guid id)
        {
            var result = _repo.DeleteUser(id);
            if (result == false)
            {
                return BadRequest("Ошибка удаления пользователя.");
            }
            else
            {
                return Ok($"Пользователь {id} удалён!");
            }
        }

        [HttpPut("updateUser")]

        public async Task<ActionResult<User>> UpdateUser(User user, Guid id)
        {
            var result = _repo.EditUser(user, id);
            if(result == null)
            {
                return BadRequest("Не получилось обновить пользователя!");
            }    
            else
            {
                return Ok(result);
            }
        }
        

        /*// GET: Users/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.User_Guid == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // GET: Users/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("User_Guid,UserName,Password,Email")] User user)
        {
            if (ModelState.IsValid)
            {
                user.User_Guid = Guid.NewGuid();
                _context.Add(user);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(user);
        }

        // GET: Users/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return View(user);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("User_Guid,UserName,Password,Email")] User user)
        {
            if (id != user.User_Guid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(user);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(user.User_Guid))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(user);
        }

        // GET: Users/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.User_Guid == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.User_Guid == id);
        }*/



        // GET: api/Users/auth?email=a&password=b
        [HttpGet("auth")]
        public async Task<ActionResult<User>> GetByEmailAndPassword(string email, string password)
        {

            var current_user = _repo.GetUserByEmailAndPassword(email, password);
            if (current_user != null)
            {
                return Ok(current_user);
            }

            else
            {
                return Problem("Не удается найти пользователя!");
            }
        }
    }


}
