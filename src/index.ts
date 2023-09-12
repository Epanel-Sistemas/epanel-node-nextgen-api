import './config/aliases'

import * as dotenv from 'dotenv'
dotenv.config()

import { startServer } from '@/config/server'
startServer()
