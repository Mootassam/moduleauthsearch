import UserRepository from '../../database/repositories/userRepository';
import Error400 from '../../errors/Error400';
import bcrypt from 'bcrypt';
import EmailSender from '../../services/emailSender';
import jwt from 'jsonwebtoken';
import TenantUserRepository from '../../database/repositories/tenantUserRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import { getConfig } from '../../config';
import TenantService from '../tenantService';
import TenantRepository from '../../database/repositories/tenantRepository';
import { tenantSubdomain } from '../tenantSubdomain';
import Error401 from '../../errors/Error401';
import moment from 'moment';

const BCRYPT_SALT_ROUNDS = 12;

class AuthService {
 




 

 













}

export default AuthService;
