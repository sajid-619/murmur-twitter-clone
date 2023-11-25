import { Request, Response, RequestHandler } from 'express';
import { FieldPacket, OkPacket } from "mysql2";
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import connection from '../config/db_connection';
import { IMurmursProps, IFollowProps, IUserProps  } from '../model';

export const signup: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();
    const name: string = req.body?.name;
    const email: string = req.body?.email;

    const existQuery: string = `SELECT id FROM user WHERE email = '${email}'`;
    const [user_exist, ] : [IUserProps[], FieldPacket[]] = await connection.promise().execute<IUserProps[]>(existQuery, []);
    console.log(user_exist)
    if(user_exist.length > 0) {
      return res.status(200).send({
        message: "Email already exist"
      })
    }

    const password: string = req.body?.password;
    const hashedPassword = await bcrypt.hash(password, 12);

    const insertQry: string = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`;
    const [rows, ]: [OkPacket, FieldPacket[]] = await connection.promise().execute<OkPacket>(insertQry);
 
    const secret: Secret = process.env.JWT_SECRET_KEY || "";
    const signOptions: SignOptions = {
      expiresIn: "1d",
    }

    const token = jwt.sign({ id: rows.insertId }, secret, signOptions);

    res.status(200).send({
      auth: token,
      message: "User created",
      userId: rows.insertId
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "User creation failed"
    })
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();
    const password: string = req.body?.password;
    const email: string = req.body?.email;

    const existQuery: string = `SELECT * FROM user WHERE email = '${email}'`;
    const [user_exist, ] : [IUserProps[], FieldPacket[]] = await connection.promise().execute<IUserProps[]>(existQuery, []);
    if (user_exist.length < 1) {
      throw new Error("Invalid email, try again!");
    }
    const hashedPassword: string = user_exist[0]?.password || ""
    const isValidPass: boolean = await bcrypt.compare(password, hashedPassword);

    if (!isValidPass) {
      throw new Error("Invalid password, try again!");
    }

    const secret: Secret = process.env.JWT_SECRET_KEY || "";
    const signOptions: SignOptions = {
      expiresIn: "1d",
    }
    const token = jwt.sign({ id: user_exist[0]['id'] }, secret, signOptions);

    res.status(200).send({
      auth: token,
      message: "User Loged in",
      userId: user_exist[0]['id']
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "User creation failed"
    })
  }
};

export const userProfile: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();

    const id: string = req?.query['otherUser'] ? req?.query['otherUser'] : req.body?.authUserId;
    // req?.query['userId']  will be provided when looking for other user details

    const userQuery: string = `SELECT id, name, follow_count, followed_count FROM user WHERE id = '${id}'`;
    const [user, ] : [IUserProps[], FieldPacket[]] = await connection.promise().execute<IUserProps[]>(userQuery, []);
    const user_info = user[0];
    delete user_info.password;

    
    const murmursQuery: string = `SELECT * FROM murmurs WHERE creator = '${id}'`;
    const [murmurs, ] : [IMurmursProps[], FieldPacket[]] = await connection.promise().execute<IMurmursProps[]>(murmursQuery, []);


    res.status(200).send({
      user: user_info,
      murmurs,
      message: "Details"
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "User Info not found"
    })
  }
};


export const otherUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();
    const id: string = req.body?.authUserId;
  

    const userQuery: string = `SELECT id, name, follow_count, followed_count FROM user WHERE id != '${id}'`;
    const [users, ] : [IUserProps[], FieldPacket[]] = await connection.promise().execute<IUserProps[]>(userQuery, []);
  
    res.status(200).send({
      users,
      message: "Details"
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "User Info not found"
    })
  }
};


export const followUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();
    const followed_by: string = req.body?.authUserId;
    const followed_to: string = req.params?.followed_to;
    console.log(followed_to, followed_by)
    if(followed_by.toString() === followed_to.toString()) {
      return res.status(400).send({
        message: "Cant follow ownself"
      })
    }
    
    const existQuery: string = `SELECT id FROM follow WHERE followed_by = '${followed_by}' AND followed_to = '${followed_to}'`;
    const [follow_exist, ] : [IFollowProps[], FieldPacket[]] = await connection.promise().execute<IFollowProps[]>(existQuery, []);

    console.log(follow_exist)
    if(follow_exist.length > 0) {
      return res.status(200).send({
        message: "Already Follwoing The User"
      })
    }

    const insertQuery: string = `INSERT INTO follow (followed_by, followed_to) VALUES ('${followed_by}', '${followed_to}')`;
    const followedToQuery: string = `UPDATE user SET followed_count = followed_count + 1 WHERE id = '${followed_to}'`;
    const followedByQuery: string = `UPDATE user SET follow_count = follow_count + 1 WHERE id = '${followed_by}'`;

    // const [rows, ]: [OkPacket, FieldPacket[]] = 
    await Promise.all([
      connection.promise().execute<OkPacket>(insertQuery),
      connection.promise().execute<OkPacket>(followedToQuery),
      connection.promise().execute<OkPacket>(followedByQuery)
    ]);

    res.status(200).send({
      message: "Followed User"
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "Failed yo follow"
    })
  }
};