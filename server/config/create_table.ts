import connection  from './db_connection'
const CreateTable = () => {

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql_murmurs: string = `CREATE TABLE IF NOT EXISTS murmurs\
        (id int NOT NULL AUTO_INCREMENT primary key,\
        text varchar(255) NOT NULL,\
        like_count int DEFAULT 0,\
        creator int NOT NULL)`;
    connection.query(sql_murmurs, function (err, result) {
      if (err) throw err;
    });
    
    let sql_follow: string = `CREATE TABLE IF NOT EXISTS follow\
        (id int NOT NULL AUTO_INCREMENT primary key,\
        followed_to int NOT NULL,\
        followed_by int NOT NULL)`;
    connection.query(sql_follow, function (err, result) {
      if (err) throw err;
      // console.log('created')
    });
    
    let sql_like: string = `CREATE TABLE IF NOT EXISTS like_murmurs\
      (id int NOT NULL AUTO_INCREMENT primary key,\
      user_id int NOT NULL,\
      post_id int NOT NULL)`;
    connection.query(sql_like, function (err, result) {
    if (err) throw err;
    });
  
  
    // connection.query('SELECT * FROM user;', function (err, result) {
    //   if (err) throw err;
    //   console.log("Result: " + JSON.stringify(result, null, 2));
    // });
  });
};

export default CreateTable
