const { adminQueries } = require("../db/dbQueries");
const {
  createNewAdminQuery,
  updateAdminQuery,
  getAllAdminsQuery,
  getAdminByIdQuery,
  getIdByPasswordQuery,
  getAdminPermissionQuery,
  createNewActivityQuery,
  getAllActivitiesQuery,
  getAllActivitiesSearchQuery,
  getActivityByIdQuery,
  verifyAdminQuery,
  updateLoginQuery,
  getAllDeletedAdminQuery,
  deleteAdminQuery
} = adminQueries;
const pool = require('../db/database');


module.exports = {
  createNewAdminDB: (admin_name, admin_username, admin_password, role, profilePicture) => {
    return new Promise((resolve, reject) => {
      pool.execute(createNewAdminQuery,
        [admin_name, admin_username, admin_password, role, profilePicture],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    })
  },
  updateAdminDB: (id, admin_name, admin_username, admin_password, role, profilePicture) => {
    return new Promise(async (resolve, reject) => {
      const idExist = await module.exports.getAdminByIdDB(id);
      if (idExist === null) resolve(null);

      pool.execute(updateAdminQuery,
        [admin_name, admin_username, admin_password, role, profilePicture, id],
        (error, result) => {
          if (error) return reject(error);
          const admin = {
            admin_id: id,
            admin_name: admin_name,
            admin_username: admin_username,
            admin_password: admin_password,
            profile_picture: profilePicture.toString('base64'),
          }
          return resolve(admin);
        }
      );
    })
  },
  updateLoginDB: (admin_username, admin_password) => {
    return new Promise(async (resolve, reject) => {
      pool.execute(updateLoginQuery,
        [admin_username, admin_password],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    })
  },
  deleteAdminDB: (id, isDeleted) => {
    return new Promise(async (resolve, reject) => {
      pool.execute(deleteAdminQuery,
        [isDeleted, id],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    })
  },
  getAllAdminsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllAdminsQuery,
        [],
        (error, result) => {
          if (error) return reject(error);
          if (result.length === null) {
            return resolve(null)
          } else {
            const admin = result.map((value) => ({
              admin_id: value.admin_id,
              admin_name: value.admin_name,
              admin_username: value.admin_username,
              admin_password: value.admin_password,
              role: value.role,
              profile_picture: value.profile_picture.toString('base64'),
            }))
            return resolve(admin);
          }
        }
      );
    })
  },
  getAllDeletedAdminDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllDeletedAdminQuery,
        [],
        (error, result) => {
          if (error) return reject(error);
          if (result.length === 0) {
            return resolve(null)
          } else {
            return resolve(result);
          }
        }
      );
    })
  },
  getAdminByIdDB: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getAdminByIdQuery,
        [id],
        (error, result) => {
          if (error) return reject(error);
          if (result.length === 0) {
            return resolve(null)
          } else {
            const admin = result.map((value) => ({
              admin_id: value.admin_id,
              admin_name: value.admin_name,
              admin_username: value.admin_username,
              admin_password: value.admin_password,
              role: value.role,
              profile_picture: value.profile_picture.toString('base64'),
            }))
            return resolve(admin);
          }
        }
      );
    })
  },
  getIdByPasswordDB: (value) => {
    return new Promise((resolve, reject) => {
      pool.execute(getIdByPasswordQuery,
        [value],
        (error, result) => {
          if (error) return reject(error);
          if (result.length === 0) {
            return resolve(null)
          }
          return resolve(result);
        }
      );
    })
  },

  getAdminPermissionDB: (password, permittedRoles) => {
    return new Promise(async (resolve, reject) => {
      const getRequestRole = await module.exports.getIdByPasswordDB(password);
      if (getRequestRole === null) return resolve(null);
      const { admin_id, role } = getRequestRole[0];

      if (permittedRoles.includes(role)) {
        pool.execute(getAdminPermissionQuery,
          [admin_id, role],
          (error, result) => {
            if (error) return reject(error);
            if (result.length === 0) {
              return resolve(null)
            } else {
              const admin = result.map((value) => ({
                admin_id: value.admin_id,
                admin_name: value.admin_name,
                admin_username: value.admin_username,
                admin_password: value.admin_password,
                role: value.role,
              }))
              return resolve(admin);
            }
          }
        )
      } else {
        return resolve(0);
      }
    })
  },
  createNewActivityDB: (admin_id, action, target, object, change, message) => {
    return new Promise(async (resolve, reject) => {
      pool.execute(createNewActivityQuery,
        [admin_id, action, target, object, change ? change : null, message],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      )
    })
  },
  getAllActivitiesDB: () => {
    return new Promise(async (resolve, reject) => {
      pool.execute(getAllActivitiesQuery,
        [], (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      )
    })
  },
  getAllActivitiesSearchDB: (search) => {
    return new Promise(async (resolve, reject) => {
      pool.execute(getAllActivitiesSearchQuery,
        [search], (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      )
    })
  },
  getActivityByIdDB: (id) => {
    return new Promise(async (resolve, reject) => {
      pool.execute(getActivityByIdQuery,
        [id], (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      )
    })
  },
  verifyAdminDB: (username, password) => {
    return new Promise(async (resolve, reject) => {
      pool.execute(verifyAdminQuery,
        [username, password], (error, result) => {
          if (error) return reject(error);
          if (result.length === 0) return resolve(null)
          return resolve(result);
        }
      )
    })
  },



}